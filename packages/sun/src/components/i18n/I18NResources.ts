import Router from 'koa-router'
import Koa from 'koa'
import { PublicResources } from "../../Utils/Resources"
import { injectable } from 'inversify'

@injectable()
export class I18NResources implements PublicResources {
    private router: Router

    constructor() {
        this.router = new Router({prefix: '/i18n'})
        this.router.get('/:lang', this.get.bind(this))
    }

    get routes(): Koa.Middleware {
        return this.router.routes()
    }

    private async get(context: Koa.Context): Promise<void> {
        const lang = context.params.lang
        const translations: any = {
            en: {
                title: 'Title'
            },
            es: {
                title: 'Título'
            }
        }
        context.body = translations[lang] || translations.en
        context.status = 200
    }
}