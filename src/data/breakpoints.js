const breakpoints = [768, 375];
const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`);

export { breakpoints, mq };
