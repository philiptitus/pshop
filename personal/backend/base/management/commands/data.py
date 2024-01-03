# yourapp/management/commands/generate_fake_specifications.py
from django.core.management.base import BaseCommand
from faker import Faker
from ...models import Specification, Product, User

class Command(BaseCommand):
    help = 'Generate fake specifications for existing products'

    def handle(self, *args, **kwargs):
        # Create instances of the Faker class
        fake = Faker()

        # Generate fake specifications for existing products
        self.generate_fake_specifications(fake)

        self.stdout.write(self.style.SUCCESS('Successfully generated fake specifications for existing products.'))

    def generate_fake_specifications(self, fake):
        # Get all existing products and users
        products = Product.objects.all()
        users = User.objects.all()

        # Generate fake specifications for each existing product
        for product in products:
            user = fake.random_element(users)
            specification_one = fake.word()
            specification_two = fake.word()
            specification_three = fake.word()
            specification_four = fake.word()
            specification_five = fake.word()
            specification_six = fake.word()
            specification_seven = fake.word()
            specification_eight = fake.word()
            specification_nine = fake.word()
            specification_ten = fake.word()

            # Create a Specification instance
            specification = Specification(
                product=product,
                user=user,
                specification_one=specification_one,
                specification_two=specification_two,
                specification_three=specification_three,
                specification_four=specification_four,
                specification_five=specification_five,
                specification_six=specification_six,
                specification_seven=specification_seven,
                specification_eight=specification_eight,
                specification_nine=specification_nine,
                specification_ten=specification_ten
            )

            # Save the Specification instance
            specification.save()
