using StayFit.Shared.Diaries;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IDiaryService
    {
        public Task<string> CreateDiary(string userId);

        public Task<bool> IsDiaryOwner(string userId);

        public Task<string> CreateNote(string userId,string date,CreateNoteModel model);

        public Task<string> EditNote(string userId,int noteId,EditNoteModel model);

        public Task<IEnumerable<NoteModel>> LoadNotes(string userId,int year,int month);

        public Task<NoteModel> LoadNoteById(string userId, int noteId, string? take);
    }
}
