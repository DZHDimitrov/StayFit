using Microsoft.EntityFrameworkCore.Migrations;

namespace StayFit.Data.Migrations
{
    public partial class AddRecievedMessagesToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_AspNetUsers_ApplicationUserId",
                table: "Messages");

            migrationBuilder.RenameColumn(
                name: "ApplicationUserId",
                table: "Messages",
                newName: "SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_ApplicationUserId",
                table: "Messages",
                newName: "IX_Messages_SenderId");

            migrationBuilder.AddColumn<string>(
                name: "ReceieverId",
                table: "Messages",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ReceieverId",
                table: "Messages",
                column: "ReceieverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_AspNetUsers_ReceieverId",
                table: "Messages",
                column: "ReceieverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_AspNetUsers_SenderId",
                table: "Messages",
                column: "SenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_AspNetUsers_ReceieverId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_AspNetUsers_SenderId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_ReceieverId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "ReceieverId",
                table: "Messages");

            migrationBuilder.RenameColumn(
                name: "SenderId",
                table: "Messages",
                newName: "ApplicationUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_SenderId",
                table: "Messages",
                newName: "IX_Messages_ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_AspNetUsers_ApplicationUserId",
                table: "Messages",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
