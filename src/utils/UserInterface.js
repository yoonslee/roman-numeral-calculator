class UserInterface {
  static BREAKPOINTS = [768, 375];
  static MEDIA_QUERIES = this.BREAKPOINTS.map(
    bp => `@media (max-width: ${bp}px)`
  );
  static THEMES_KEYS = {
    CLASSIC: "CLASSIC",
    EXPERIMENTAL: "EXPERIMENTAL"
  };
  static BUTTON_TYPES = {
    EDIT: "EDIT",
    OPERATION: "OPERATION",
    NUMERAL: "NUMERAL"
  };
}

export default UserInterface;
