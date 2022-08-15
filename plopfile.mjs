export default function (plop) {
    /** @type {import('plop').NodePlopAPI} */
    plop.setGenerator('basics', {
        description: 'application controller logic',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Name you model: '
        }, {
            type: 'input',
            name: 'name',
            message: 'Name you Controller: '
        }],
        actions: [{
            type: 'add',
            path: 'src/model/{{snakeCase name}}.model.ts',
            templateFile: 'template/model.tamplate.hbs'
        }, {
            type: 'add',
            path: 'src/contoller/{{snakeCase name}}.controller.ts',
            templateFile: 'template/controller.tamplate.hbs'
        }]
    });
    plop.setHelper('titleCase', (str) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    })
    plop.setHelper('snakeCase', (str) => {
        return str.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).map((w) => w.toLowerCase()).join('_')
    })
};




