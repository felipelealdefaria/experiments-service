import * as Exp from '@/domain/experiments'
import { ExperimentsParams } from '@/data/experiments-params'

export class ExperimentsService implements Exp.Experiments {
  baseUrl = 'http://127.0.0.1:5000'
  constructor (
    private readonly experiment: ExperimentsParams
  ) {}

  async init ({ baseUrl, timeout }: Exp.InitParams): Promise<Exp.InitResponse> {
    this.baseUrl = baseUrl
    const res: Exp.InitResponse = await this.experiment.startExperiment({ baseUrl: baseUrl, timeout: timeout })

    if (res?.success) return { success: true, session: res?.session }
    return { error: true, session: null }
  }

  async participate ({ traffic, session, variationsName, experimentName }: Exp.ParticipateParams): Promise<Exp.ParticipateResponse> {
    if (!session) session = await this.init({ baseUrl: this.baseUrl })

    const force = this.forceVariant(`force-${experimentName}`)
    const res: Exp.ParticipateResponse = await this.experiment.participateExperiment({ force, session, experimentName, variationsName, traffic: traffic || 1 })

    if (res?.success) return { success: true, experimentName: res?.experimentName, alternativeName: res?.alternativeName }
    return { error: true, experimentName: null, alternativeName: null }
  }

  async convert ({ kpi, session, experimentName }: Exp.ConvertParams): Promise<Exp.ConvertResponse> {
    if (!session) session = await this.init({ baseUrl: this.baseUrl })
    const res: Exp.ConvertResponse = await this.experiment.convertEvent({ kpi, session, experimentName })

    if (res?.success) return { success: true, kpi: res?.kpi, experimentName: res?.experimentName, alternativeName: res?.alternativeName }
    return { error: true, message: res?.message }
  }

  forceVariant (cookieName: string): any {
    const decodedCookies = decodeURIComponent(document.cookie)
    const cookies = decodedCookies.split(';')
    const forceCookie = cookies.find((cookie) => cookie.match(cookieName))

    if (forceCookie) return forceCookie.replace(`${cookieName}=`, '').trim()
    return forceCookie || null
  }
}
