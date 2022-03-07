using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StayFit.Infrastructure.Extensions;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared;
using StayFit.Shared.Diaries;
using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace StayFit.WebAPI.Controllers.Api.Diaries
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class DiaryController : BaseController
    {
        private readonly IDiaryService diaryService;

        public DiaryController(IDiaryService diaryService)
        {
            this.diaryService = diaryService;
        }

        [HttpPost]
        public async Task<ApiResponse<string>> CreateDiary()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var response = await this.diaryService.CreateDiary(userId);

            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("diary_owner")]
        public async Task<ApiResponse<bool>> IsDiaryOwner()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var response = await this.diaryService.IsDiaryOwner(userId);

            return response.ToApiResponse();
        }

        [Route("{year}/{month}")]
        public async Task<ApiResponse<IEnumerable<NoteModel>>> LoadNotes(int year,int month)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var response = await diaryService.LoadNotes(userId, year,month);

            return response.ToApiResponse();
        }

        [HttpPost]
        [Route("{date}/notes")]
        public async Task<ApiResponse<string>> CreateNote(string date,CreateNoteModel model)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var response = await diaryService.CreateNote(userId,date, model);

            return response.ToApiResponse();
        }
        [HttpPut]
        [Route("{noteId}/notes")]
        public async Task<ApiResponse<string>> EditNoteById(int noteId,EditNoteModel model)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var response = await diaryService.EditNote(userId, noteId, model);

            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{noteId}/notes")]
        public async Task<ApiResponse<NoteModel>> LoadNoteById(int noteId,[FromQuery] string take)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var response = await diaryService.LoadNoteById(userId, noteId, take);

            return response.ToApiResponse();
        }
    }
}
