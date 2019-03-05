const gulp = require('gulp');
const template = require('gulp-template');
const path = require("path");
const fs = require('fs');
const rename = require("gulp-rename");

const generatePath = './dist/';

module.exports.generateTemplate = (metaInfo) => {
    return async () => {
        const dirname = generatePath + metaInfo.operationName
        await mkdirsSync(dirname)

        // generate the global file
        await gulp.src('./template/global.yml')
            .pipe(template(metaInfo))
            .pipe(gulp.dest((dirname)))

        // generate the basic file
        await gulp.src('./template/base.yml')
                .pipe(rename(function (path) {
                    path.dirname = ('../../' + dirname)
                    path.basename = (metaInfo.projectName + '-base');
                    path.extname = ".yml";
                }))
                .pipe(gulp.dest(dirname));

        // TODO generate the sct file
        await gulp.src('./template/global.yml')
            .pipe(template(metaInfo))
            .pipe(gulp.dest(((dirname + '/sct'))))

        // TODO generate the mct file
        await gulp.src('./template/global.yml')
            .pipe(template(metaInfo))
            .pipe(gulp.dest(((dirname + '/mct'))))

        // TODO generate the cert file
        await gulp.src('./template/global.yml')
            .pipe(template(metaInfo))
            .pipe(gulp.dest(((dirname + '/cert'))))

        // TODO generate the prod file

    }
}

/**
 *  create the folder
 */
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;  
    } else {  
        if (mkdirsSync(path.dirname(dirname))) {  
            fs.mkdirSync(dirname);  
            return true;  
        }  
    }  
}  