export default {
  async beforeCreate(event: any) {
    const { data } = event.params;
    
    // Try to get user from different possible sources
    if (event.state?.user?.id) {
      data.customer = event.state.user.id;
      console.log("✅ Auto-set customer from event.state.user");
    } else if (event.state?.authUser?.id) {
      data.customer = event.state.authUser.id;
      console.log("✅ Auto-set customer from event.state.authUser");
    } else {
      console.log("⚠️ Could not find authenticated user in event state");
    }
  },
};