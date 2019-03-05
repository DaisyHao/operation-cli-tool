const gulp = require('gulp');

const cleanWorkspace = require('./task/clean-folder');
const templateGeneration = require('./task/template-generation');

const metaData = require('./meta.json');


const distPath = './dist/' + metaData.projectName

// clean the folder
gulp.task('clean-folder', cleanWorkspace.cleanWordSpace([distPath]))

gulp.task('generate-settigns', ['clean-folder'], templateGeneration.generateTemplate(metaData))

// the default task
gulp.task('default', ['generate-settigns'])

