using Microsoft.EntityFrameworkCore.Migrations;

namespace StayFit.Data.Migrations
{
    public partial class AddChosenCommentsToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                schema: "Forum",
                table: "Comments",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UserId",
                schema: "Forum",
                table: "Comments",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_AspNetUsers_UserId",
                schema: "Forum",
                table: "Comments",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_AspNetUsers_UserId",
                schema: "Forum",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Comments_UserId",
                schema: "Forum",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "Forum",
                table: "Comments");
        }
    }
}
