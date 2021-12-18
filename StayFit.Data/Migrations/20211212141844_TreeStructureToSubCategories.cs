using Microsoft.EntityFrameworkCore.Migrations;

namespace StayFit.Data.Migrations
{
    public partial class TreeStructureToSubCategories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ParentId",
                table: "ReadingSubCategories",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReadingSubCategories_ParentId",
                table: "ReadingSubCategories",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReadingSubCategories_ReadingSubCategories_ParentId",
                table: "ReadingSubCategories",
                column: "ParentId",
                principalTable: "ReadingSubCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReadingSubCategories_ReadingSubCategories_ParentId",
                table: "ReadingSubCategories");

            migrationBuilder.DropIndex(
                name: "IX_ReadingSubCategories_ParentId",
                table: "ReadingSubCategories");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "ReadingSubCategories");
        }
    }
}
