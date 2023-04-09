function showWelcome() {
    try {
        const message = "Welcome to 2023!";
        message.nonExistentMethod();
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

