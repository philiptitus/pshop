import secrets
import string

def generate_random_values(length):
    # Define the characters to use for the random values
    characters = string.ascii_letters + string.digits
    
    # Generate a random string of length 10
    random_values = ''.join(secrets.choice(characters) for _ in range(10))
    
    return random_values

def main():
    # Prompt the user to enter a number
    try:
        user_number = int(input("Enter a number: "))
    except ValueError:
        print("Invalid input. Please enter a valid number.")
        return
    
    # Generate random values based on the entered number
    random_set = generate_random_values(user_number)
    print(f"Random values: {random_set}")

if __name__ == "__main__":
    main()
