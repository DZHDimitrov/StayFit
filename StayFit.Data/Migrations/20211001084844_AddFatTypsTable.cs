using Microsoft.EntityFrameworkCore.Migrations;

namespace StayFit.Data.Migrations
{
    public partial class AddFatTypsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FoodFats_FatType_FatTypeId",
                table: "FoodFats");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FatType",
                table: "FatType");

            migrationBuilder.RenameTable(
                name: "FatType",
                newName: "FatTypes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FatTypes",
                table: "FatTypes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FoodFats_FatTypes_FatTypeId",
                table: "FoodFats",
                column: "FatTypeId",
                principalTable: "FatTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FoodFats_FatTypes_FatTypeId",
                table: "FoodFats");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FatTypes",
                table: "FatTypes");

            migrationBuilder.RenameTable(
                name: "FatTypes",
                newName: "FatType");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FatType",
                table: "FatType",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FoodFats_FatType_FatTypeId",
                table: "FoodFats",
                column: "FatTypeId",
                principalTable: "FatType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
