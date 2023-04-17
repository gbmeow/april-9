function showWelcome() {
    try {
      const message = "Welcome to 2023!";
      message.nonExistentMethod();
      return "Success";
    } catch (error) {
      console.error('An error occurred:', error);
      return "Error: " + error.message;
    }
  }
  