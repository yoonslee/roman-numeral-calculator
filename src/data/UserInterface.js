class UserInterface {
  static breakpoints = [768, 375];
  static mq = this.breakpoints.map(bp => `@media (max-width: ${bp}px)`);
}

export default UserInterface;
