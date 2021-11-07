using Microsoft.EntityFrameworkCore.Migrations;

namespace StayFit.Data.Migrations
{
    public partial class AddForumSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Forum");

            migrationBuilder.RenameTable(
                name: "PostSubCategories",
                newName: "PostSubCategories",
                newSchema: "Forum");

            migrationBuilder.RenameTable(
                name: "Posts",
                newName: "Posts",
                newSchema: "Forum");

            migrationBuilder.RenameTable(
                name: "PostMainCategories",
                newName: "PostMainCategories",
                newSchema: "Forum");

            migrationBuilder.RenameTable(
                name: "Comments",
                newName: "Comments",
                newSchema: "Forum");

            migrationBuilder.AddColumn<int>(
                name: "PostSubCategoryId",
                schema: "Forum",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_PostSubCategoryId",
                schema: "Forum",
                table: "Posts",
                column: "PostSubCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_PostSubCategories_PostSubCategoryId",
                schema: "Forum",
                table: "Posts",
                column: "PostSubCategoryId",
                principalSchema: "Forum",
                principalTable: "PostSubCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_PostSubCategories_PostSubCategoryId",
                schema: "Forum",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_PostSubCategoryId",
                schema: "Forum",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "PostSubCategoryId",
                schema: "Forum",
                table: "Posts");

            migrationBuilder.RenameTable(
                name: "PostSubCategories",
                schema: "Forum",
                newName: "PostSubCategories");

            migrationBuilder.RenameTable(
                name: "Posts",
                schema: "Forum",
                newName: "Posts");

            migrationBuilder.RenameTable(
                name: "PostMainCategories",
                schema: "Forum",
                newName: "PostMainCategories");

            migrationBuilder.RenameTable(
                name: "Comments",
                schema: "Forum",
                newName: "Comments");
        }
    }
}
