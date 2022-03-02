using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StayFit.Data.Migrations
{
    public partial class RemoveSearchNamesColumnsAndBodyPartsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Readings_BodyParts_BodyPartId",
                table: "Readings");

            migrationBuilder.DropTable(
                name: "BodyParts");

            migrationBuilder.DropIndex(
                name: "IX_Readings_BodyPartId",
                table: "Readings");

            migrationBuilder.DropColumn(
                name: "SearchName",
                table: "ReadingSubCategories");

            migrationBuilder.DropColumn(
                name: "BodyPartId",
                table: "Readings");

            migrationBuilder.DropColumn(
                name: "SearchTitle",
                table: "Readings");

            migrationBuilder.DropColumn(
                name: "SearchName",
                table: "ReadingMainCategories");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Readings",
                newName: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Readings",
                newName: "Title");

            migrationBuilder.AddColumn<string>(
                name: "SearchName",
                table: "ReadingSubCategories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BodyPartId",
                table: "Readings",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SearchTitle",
                table: "Readings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SearchName",
                table: "ReadingMainCategories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BodyParts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SearchName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BodyParts", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Readings_BodyPartId",
                table: "Readings",
                column: "BodyPartId");

            migrationBuilder.AddForeignKey(
                name: "FK_Readings_BodyParts_BodyPartId",
                table: "Readings",
                column: "BodyPartId",
                principalTable: "BodyParts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
