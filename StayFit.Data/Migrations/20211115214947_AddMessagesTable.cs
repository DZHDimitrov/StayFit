using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StayFit.Data.Migrations
{
    public partial class AddMessagesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Readings",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Readings_ApplicationUserId",
                table: "Readings",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ApplicationUserId",
                table: "Messages",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Readings_AspNetUsers_ApplicationUserId",
                table: "Readings",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Readings_AspNetUsers_ApplicationUserId",
                table: "Readings");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Readings_ApplicationUserId",
                table: "Readings");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Readings");

            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "AspNetUsers");
        }
    }
}
