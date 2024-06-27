document.addEventListener("DOMContentLoaded", () => {
   // Defining important variables
   const form = document.querySelector("form");

   // Defining input elements and error messages
   const dayLabel = document.getElementById('dayLabel');
   const monthLabel = document.getElementById('monthLabel');
   const yearLabel = document.getElementById('yearLabel');
   const dayInput = document.getElementById("day");
   const monthInput = document.getElementById("month");
   const yearInput = document.getElementById("year");
   const dayError = document.getElementById("dayError");
   const monthError = document.getElementById("monthError");
   const yearError = document.getElementById("yearError");

   // Defining elements to display the calculated age
   const spanYears = document.getElementById('years');
   const spanMonths = document.getElementById('months');
   const spanDays = document.getElementById('days');

   // Function to handle form security and validation
   function formSecurity(event, element, label, error, length, min, max) {
      event.addEventListener('submit', (e) => {
         if (element.value === "" || element.value.length !== length) {
            error.style.display = "block";
            label.style.color = "hsl(0, 100%, 67%)";
            element.classList.add('focused');
            e.preventDefault();
         } else {
            error.style.display = "none";
            element.classList.remove('focused');
         }

         const value = parseInt(element.value, 10);
         if (value < min || value > max) {
            error.style.display = "block";
            e.preventDefault();
         }
      });
   }

   // Current year for validation
   const currentYear = new Date().getFullYear();

   // Apply form security function to day, month, and year inputs
   formSecurity(form, dayInput, dayLabel, dayError, 2, 1, 31);
   formSecurity(form, monthInput, monthLabel, monthError, 2, 1, 12);
   formSecurity(form, yearInput, yearLabel, yearError, 4, 1900, currentYear);

   // Function to calculate age and render submitted data
   form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve input values
      const year = parseInt(yearInput.value, 10);
      const month = parseInt(monthInput.value, 10);
      const day = parseInt(dayInput.value, 10);

      // Check if date is valid
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
         // Create a new date object from the input values
         const birthDate = new Date(year, month - 1, day); // month - 1 because months are zero-indexed

         // Calculate age in years, months, and days
         const ageDate = new Date(Date.now() - birthDate.getTime());
         const ageYears = ageDate.getUTCFullYear() - 1970;
         const ageMonths = ageDate.getUTCMonth();
         const ageDays = ageDate.getUTCDate() - 1;

         // Display age on the page
         spanYears.textContent = ageYears;
         spanMonths.textContent = ageMonths;
         spanDays.textContent = ageDays;
         
      } else {
         // Display default values if date is not valid
         spanYears.textContent = `- -`;
         spanMonths.textContent = `- -`;
         spanDays.textContent = `- -`;
      }
   });

});
