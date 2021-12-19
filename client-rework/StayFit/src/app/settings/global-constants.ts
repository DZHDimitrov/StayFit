export class GlobalConstants {
    public static REQUIRED_FIELD = 'Полето е задължително';

    public static FIELD_MIN_LENGTH = (length:number) => `Полето трябва да съдържа поне ${length} символа`;
    public static FIELD_MAX_LENGTH = (length:number) => `Полето не може да бъде по-дълго от ${length} символа`;
}