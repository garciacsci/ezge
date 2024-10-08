// For utilizing student and course api routes
const axios = require('axios'), config = require('../src/config');

// Get wishlisted courses Middleware Function
async function getWishlistedCourses(studentID, geArea) {
    let wishlistedCourses = [];
    try {
        // Make a GET request to fetch the student by their ID
        const studentResponse =
            await axios.get(`http://localhost:${config.PORT}/api/students/studentID/${studentID}`);
        const student = studentResponse.data[0];

        // Iterate over the wishlisted courses for the student and make a GET request to fetch each course by its POS_ID
        for (const course of student.courses.wishList) {
            const courseResponse =
                await axios.get(`http://localhost:${config.PORT}/api/courses/POS_ID/${course.POS_ID}`);
            const fetchedCourse = courseResponse.data[0];
            //console.log(`fetchedCourse: `, fetchedCourse);
            //console.log(`fetchedCourse.GE_ATTRIBUTE: `, fetchedCourse.GE_ATTRIBUTE);
            //console.log(`geArea: `, geArea);
            if (fetchedCourse.GE_ATTRIBUTE === geArea) {
                //console.log(`PUSHED fetchedCourse: `, fetchedCourse);
                wishlistedCourses.push(fetchedCourse);
            }
        }
    } catch (error) {
        console.error(error);
    }
    //console.log('getwishlistedCourses:', wishlistedCourses);
    return wishlistedCourses;
}

module.exports = getWishlistedCourses;