import 'module-alias/register'
import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl).then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Listening in ${env.port} port`))
}).catch(console.error)
