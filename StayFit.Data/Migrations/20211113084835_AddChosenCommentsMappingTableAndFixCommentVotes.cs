using Microsoft.EntityFrameworkCore.Migrations;

namespace StayFit.Data.Migrations
{
    public partial class AddChosenCommentsMappingTableAndFixCommentVotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_AspNetUsers_UserId",
                schema: "Forum",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Likes_Comments_CommentId",
                schema: "Forum",
                table: "Likes");

            migrationBuilder.DropTable(
                name: "UserLikes",
                schema: "Forum");

            migrationBuilder.DropIndex(
                name: "IX_Comments_UserId",
                schema: "Forum",
                table: "Comments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Likes",
                schema: "Forum",
                table: "Likes");

            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "Forum",
                table: "Comments");

            migrationBuilder.RenameTable(
                name: "Likes",
                schema: "Forum",
                newName: "Votes",
                newSchema: "Forum");

            migrationBuilder.RenameIndex(
                name: "IX_Likes_CommentId",
                schema: "Forum",
                table: "Votes",
                newName: "IX_Votes_CommentId");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                schema: "Forum",
                table: "Votes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Votes",
                schema: "Forum",
                table: "Votes",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "UsersChosenComments",
                schema: "Forum",
                columns: table => new
                {
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CommentId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersChosenComments", x => new { x.ApplicationUserId, x.CommentId });
                    table.ForeignKey(
                        name: "FK_UsersChosenComments_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersChosenComments_Comments_CommentId",
                        column: x => x.CommentId,
                        principalSchema: "Forum",
                        principalTable: "Comments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Votes_ApplicationUserId",
                schema: "Forum",
                table: "Votes",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersChosenComments_CommentId",
                schema: "Forum",
                table: "UsersChosenComments",
                column: "CommentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Votes_AspNetUsers_ApplicationUserId",
                schema: "Forum",
                table: "Votes",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Votes_Comments_CommentId",
                schema: "Forum",
                table: "Votes",
                column: "CommentId",
                principalSchema: "Forum",
                principalTable: "Comments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Votes_AspNetUsers_ApplicationUserId",
                schema: "Forum",
                table: "Votes");

            migrationBuilder.DropForeignKey(
                name: "FK_Votes_Comments_CommentId",
                schema: "Forum",
                table: "Votes");

            migrationBuilder.DropTable(
                name: "UsersChosenComments",
                schema: "Forum");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Votes",
                schema: "Forum",
                table: "Votes");

            migrationBuilder.DropIndex(
                name: "IX_Votes_ApplicationUserId",
                schema: "Forum",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                schema: "Forum",
                table: "Votes");

            migrationBuilder.RenameTable(
                name: "Votes",
                schema: "Forum",
                newName: "Likes",
                newSchema: "Forum");

            migrationBuilder.RenameIndex(
                name: "IX_Votes_CommentId",
                schema: "Forum",
                table: "Likes",
                newName: "IX_Likes_CommentId");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                schema: "Forum",
                table: "Comments",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Likes",
                schema: "Forum",
                table: "Likes",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "UserLikes",
                schema: "Forum",
                columns: table => new
                {
                    VoteId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLikes", x => new { x.VoteId, x.ApplicationUserId });
                    table.ForeignKey(
                        name: "FK_UserLikes_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserLikes_Likes_VoteId",
                        column: x => x.VoteId,
                        principalSchema: "Forum",
                        principalTable: "Likes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UserId",
                schema: "Forum",
                table: "Comments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLikes_ApplicationUserId",
                schema: "Forum",
                table: "UserLikes",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_AspNetUsers_UserId",
                schema: "Forum",
                table: "Comments",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_Comments_CommentId",
                schema: "Forum",
                table: "Likes",
                column: "CommentId",
                principalSchema: "Forum",
                principalTable: "Comments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
