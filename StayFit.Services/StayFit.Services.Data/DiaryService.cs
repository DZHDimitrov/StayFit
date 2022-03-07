using Microsoft.EntityFrameworkCore;
using StayFit.Data.Common.Repositories;
using StayFit.Data.Models.DiaryModels;
using StayFit.Services.Common;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Diaries;
using StayFit.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{

    public class DiaryService : IDiaryService
    {
        private readonly IRepository<Diary> diaryRepo;
        private readonly IRepository<Note> noteRepo;

        public DiaryService(
            IRepository<Diary> diaryRepo,
            IRepository<Note> noteRepo)
        {
            this.diaryRepo = diaryRepo;
            this.noteRepo = noteRepo;
        }

        public async Task<string> CreateDiary(string userId)
        {
            var diary = await diaryRepo
                .All()
                .Where(d => d.ApplicationUserId == userId)
                .FirstOrDefaultAsync();

            if (diary != null)
            {
                throw new ArgumentException(ServicesDataConstants.UserAlreadyOwnsADiary);
            }

            var newDiary = new Diary
            {
                ApplicationUserId = userId,
                CreatedOn = DateTime.Now,
            };

            await diaryRepo.AddAsync(newDiary);
            await diaryRepo.SaveChangesAsync();

            return newDiary.Id.ToString();
        }

        public async Task<string> CreateNote(string userId, string date, CreateNoteModel model)
        {

            MoodType moodType;
            var isValidMoodType = Enum.TryParse(model.Mood, out moodType);

            if (!isValidMoodType)
            {
                throw new ArgumentException(string.Format(ServicesDataConstants.InvalidMoodType,model.Mood));
            }

            DateTime currentDate;
            var isValidDate = DateTime.TryParse(date, CultureInfo.InvariantCulture, DateTimeStyles.None, out currentDate);

            if (!isValidDate)
            {
                throw new ArgumentException(string.Format(ServicesDataConstants.InvalidDate,date));
            }

            double? sleepHours = null;

            if (!string.IsNullOrEmpty(model.SleepHours))
            {
                double currentSleepHours;
                var isValidHour = double.TryParse(model.SleepHours, out currentSleepHours);
                if (!isValidHour)
                {
                    throw new ArgumentException(string.Format(ServicesDataConstants.InvalidHour,model.SleepHours));
                }

                sleepHours = currentSleepHours;
            }

            var diary = await diaryRepo
                .All()
                .Where(d => d.ApplicationUserId == userId)
                .Select(d => new
                {
                    Id = d.Id,
                    HasNotes = d.Notes.Any(n => n.CreatedOn == currentDate)
                })
                .FirstOrDefaultAsync();

            if (diary.HasNotes)
            {
                throw new ArgumentException(string.Format(ServicesDataConstants.DiaryAlreadyFilled,date));
            }

            var note = new Note
            {
                Activity = model.Activity,
                CreatedOn = currentDate,
                DiaryId = diary.Id,
                Mood = moodType.ToString(),
                Nutrition = model.Nutrition,
                Other = model.Other,
                SleepHours = sleepHours
            };

            await noteRepo.AddAsync(note);
            await noteRepo.SaveChangesAsync();

            return note.Id.ToString();
        }

        public async Task<string> EditNote(string userId,int noteId,EditNoteModel model)
        {
            var diary = await this.diaryRepo
                .All()
                .Include(d=> d.Notes.Where(n => n.Id == noteId))
                .Where(d => d.ApplicationUserId == userId)
                .FirstOrDefaultAsync();

            if (diary == null)
            {
                throw new NullReferenceException(ServicesDataConstants.NullReferenceDiary);
            }

            if (diary.Notes.Count == 0)
            {
                throw new NullReferenceException(ServicesDataConstants.NullReferenceNote);
            }

            double? sleepHours = null;

            if (!string.IsNullOrWhiteSpace(model.SleepHours))
            {
                double hours;

                if (double.TryParse(model.SleepHours,out hours))
                {
                    sleepHours = hours;
                }
            }

            var noteToEdit = diary.Notes.First();

            noteToEdit.Mood = model.Mood;
            noteToEdit.ModifiedOn = DateTime.Now;
            noteToEdit.Other = model.Other;
            noteToEdit.Activity = model.Activity;
            noteToEdit.Nutrition = model.Nutrition;
            noteToEdit.SleepHours = sleepHours;

            this.noteRepo.Update(noteToEdit);
            await this.noteRepo.SaveChangesAsync();

            return noteToEdit.CreatedOn.ToString("dd/MM/yyyy");
        }

        public async Task<bool> IsDiaryOwner(string userId)
        {
            var diary = await this.diaryRepo.All().Where(d => d.ApplicationUserId == userId).FirstOrDefaultAsync();

            return diary != null ? true : false;
        }

        public async Task<NoteModel> LoadNoteById(string userId, int noteId, string take)
        {
            var diary = await diaryRepo
                .All()
                .Include(d => d.Notes.Where(n => n.Diary.ApplicationUserId == userId))
                .Where(d => d.ApplicationUserId == userId)
                .FirstOrDefaultAsync();


            if (diary == null)
            {
                throw new NullReferenceException(ServicesDataConstants.NullReferenceDiary);
            }

            var note = diary.Notes.Where(n => n.Id == noteId).FirstOrDefault();

            if (note == null)
            {
                throw new NullReferenceException(ServicesDataConstants.NullReferenceNote);
            }

            if (take == "next")
            {
                var nextNote = diary.Notes
                    .Where(n => note.CreatedOn.AddDays(+1) == n.CreatedOn)
                    .FirstOrDefault();

                if (nextNote == null)
                {
                    return new NoteModel
                    {
                        CreatedOn = note.CreatedOn.AddDays(+1).ToString("dd/MM/yyyy"),
                        IsModified = false,
                    };
                }
                note = nextNote;
            }
            else if (take == "previous")
            {
                var previousNote = diary.Notes
                    .Where(n => note.CreatedOn.AddDays(-1) == n.CreatedOn)
                    .FirstOrDefault();

                if (previousNote == null)
                {
                    return new NoteModel
                    {
                        CreatedOn = note.CreatedOn.AddDays(-1).ToString("dd/MM/yyyy"),
                        IsModified = false,
                    };
                }
                note = previousNote;
            }


            return new NoteModel
            {
                Id = note.Id,
                Activity = note.Activity,
                Mood = note.Mood,
                Nutrition = note.Nutrition,
                Other = note.Other,
                IsModified = true,
                SleepHours = note.SleepHours.ToString(),
                CreatedOn = note.CreatedOn.ToString("dd/MM/yyyy"),
            };
        }

        public async Task<IEnumerable<NoteModel>> LoadNotes(string userId, int year, int month)
        {
            var diary = await diaryRepo
                .All()
                .Where(d => d.ApplicationUserId == userId)
                .Include(d => d.Notes)
                .FirstOrDefaultAsync();

            if (diary == null)
            {
                throw new NullReferenceException(ServicesDataConstants.NullReferenceDiary);
            }

            var monthDays = DateTime.DaysInMonth(year, month);

            var noteModels = new List<NoteModel>();

            for (int day = 1; day <= monthDays; day++)
            {
                NoteModel noteModel = new NoteModel();

                var dateNow = DateTime.Now;
                var requestedDate = new DateTime(year, month, day);

                if (!IsEarlier(dateNow, requestedDate))
                {
                    noteModel.IsActive = false;

                    noteModels.Add(noteModel);
                    continue;
                }

                var note = diary.Notes
                    .Where(n => n.CreatedOn.Year == year && n.CreatedOn.Month == month && n.CreatedOn.Day == day)
                    .FirstOrDefault();

                if (note != null)
                {
                    noteModel = new NoteModel
                    {
                        Id = note.Id,
                        Activity = note.Activity,
                        Mood = note.Mood,
                        Other = note.Other,
                        Nutrition = note.Nutrition,
                        IsModified = true,
                        SleepHours = note.SleepHours.ToString()
                    };
                }

                noteModel.IsActive = true;

                noteModels.Add(noteModel);
            }

            return noteModels;
        }

        private bool IsEarlier(DateTime firstDate, DateTime secondDate)
        {
            var checkDate = DateTime.Compare(firstDate, secondDate);

            if (checkDate >= 0)
            {
                return true;
            }

            return false;
        }
    }
}
