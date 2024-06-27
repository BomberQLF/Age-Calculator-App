document.addEventListener("DOMContentLoaded", () => {
  // Defining impotant variables
  const form = document.querySelector("form");

  // Defining inputs and error variables
  const dayLabel = document.getElementById('dayLabel');
  const monthLabel = document.getElementById('monthLabel');
  const yearLabel = document.getElementById('yearLabel');
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");
  const dayError = document.getElementById("dayError");
  const monthError = document.getElementById("monthError");
  const yearError = document.getElementById("yearError");

   // Creating a useful function to check if the inputs contains a value
   function formSecurity (event, element, label ,error, length, min, max) {
      event.addEventListener('submit', (e) => {
         if (element.value === "" || element.value.length !== length)  {
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
      })
   }

   // Setting the current year to make sure no one was born in the future x)
   const currentYear = 2024;

   // Applying the function to the day, month and year inputs
   formSecurity(form, dayInput, dayLabel ,dayError, 2, 1, 31);
   formSecurity(form, monthInput, monthLabel ,monthError, 2, 1, 12);
   formSecurity(form, yearInput, yearLabel ,yearError, 4, 1900, currentYear);


   // Creating useful variables for my function
   const spanYears = document.getElementById('years');
   const spanMonths = document.getElementById('months');
   const spanDays = document.getElementById('days');

   // Function that adds in a dynamic way the value of the inputs after submitting the form
   function renderFormData (form, element, content) {
      if (formSecurity == true) {
         form.addEventListener('submit', (e) => {
            element.textContent = `${content.value}`;
         })
      } else {
         element.textContent = `- -`;
      }
   }

   // Calling the function to show the elements on the webpage
   renderFormData(form, spanYears, yearInput);
   renderFormData(form, spanMonths, monthInput);
   renderFormData(form, spanDays, dayInput);

});