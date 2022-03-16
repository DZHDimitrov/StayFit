using Microsoft.EntityFrameworkCore.Migrations;

namespace StayFit.Data.Migrations
{
    public partial class FixMeasurementAsFinalModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BodyPart",
                table: "Measurements");

            migrationBuilder.RenameColumn(
                name: "Value",
                table: "Measurements",
                newName: "Wrist");

            migrationBuilder.AddColumn<double>(
                name: "Ankle",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Chest",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Fats",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Height",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Hips",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "LeftArm",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "LeftCalf",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "LeftForearm",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "LeftThigh",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Neck",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "RightArm",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "RightCalf",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "RightForearm",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "RightThigh",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Shoulders",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Waist",
                table: "Measurements",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Weight",
                table: "Measurements",
                type: "float",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ankle",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "Chest",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "Fats",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "Hips",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "LeftArm",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "LeftCalf",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "LeftForearm",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "LeftThigh",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "Neck",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "RightArm",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "RightCalf",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "RightForearm",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "RightThigh",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "Shoulders",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "Waist",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Measurements");

            migrationBuilder.RenameColumn(
                name: "Wrist",
                table: "Measurements",
                newName: "Value");

            migrationBuilder.AddColumn<string>(
                name: "BodyPart",
                table: "Measurements",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
