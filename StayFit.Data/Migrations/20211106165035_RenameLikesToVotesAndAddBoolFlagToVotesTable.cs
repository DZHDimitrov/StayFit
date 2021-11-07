using Microsoft.EntityFrameworkCore.Migrations;

namespace StayFit.Data.Migrations
{
    public partial class RenameLikesToVotesAndAddBoolFlagToVotesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLikes_Likes_LikeId",
                schema: "Forum",
                table: "UserLikes");

            migrationBuilder.RenameColumn(
                name: "LikeId",
                schema: "Forum",
                table: "UserLikes",
                newName: "VoteId");

            migrationBuilder.AddColumn<bool>(
                name: "IsLike",
                schema: "Forum",
                table: "Likes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLikes_Likes_VoteId",
                schema: "Forum",
                table: "UserLikes",
                column: "VoteId",
                principalSchema: "Forum",
                principalTable: "Likes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLikes_Likes_VoteId",
                schema: "Forum",
                table: "UserLikes");

            migrationBuilder.DropColumn(
                name: "IsLike",
                schema: "Forum",
                table: "Likes");

            migrationBuilder.RenameColumn(
                name: "VoteId",
                schema: "Forum",
                table: "UserLikes",
                newName: "LikeId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserLikes_Likes_LikeId",
                schema: "Forum",
                table: "UserLikes",
                column: "LikeId",
                principalSchema: "Forum",
                principalTable: "Likes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
