using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StayFit.Data.Migrations
{
    public partial class AddMeasurements : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Measurements",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DateOfMeasurment = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Height = table.Column<double>(type: "float", nullable: false),
                    Weight = table.Column<double>(type: "float", nullable: false),
                    Fats = table.Column<double>(type: "float", nullable: false),
                    Neck = table.Column<double>(type: "float", nullable: false),
                    Shoulders = table.Column<double>(type: "float", nullable: false),
                    Chest = table.Column<double>(type: "float", nullable: false),
                    LeftArm = table.Column<double>(type: "float", nullable: false),
                    RightArm = table.Column<double>(type: "float", nullable: false),
                    LeftForearm = table.Column<double>(type: "float", nullable: false),
                    RightForearm = table.Column<double>(type: "float", nullable: false),
                    Waist = table.Column<double>(type: "float", nullable: false),
                    Wrist = table.Column<double>(type: "float", nullable: false),
                    Hist = table.Column<double>(type: "float", nullable: false),
                    LeftThigh = table.Column<double>(type: "float", nullable: false),
                    RightThigh = table.Column<double>(type: "float", nullable: false),
                    LeftCalf = table.Column<double>(type: "float", nullable: false),
                    RightCalf = table.Column<double>(type: "float", nullable: false),
                    Ankle = table.Column<double>(type: "float", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Measurements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Measurements_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Measurements_ApplicationUserId",
                table: "Measurements",
                column: "ApplicationUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Measurements");
        }
    }
}
