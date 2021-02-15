import * as Exp from '@/domain/experiments'
import { ExperimentsParams } from '@/data/experiments-params'

export class ExperimentsService implements Exp.Experiments {
  baseUrl = 'http://127.0.0.1:5000'
  constructor (
    private readonly experiment: ExperimentsParams
  ) {}

  async init ({ baseUrl }: Exp.InitParams): Promise<any> {
    this.baseUrl = baseUrl
    const session = await this.experiment.startExperiment({ baseUrl })
    return session
  }

  async participate ({
    traffic,
    session,
    variationsName,
    experimentName
  }: Exp.ParticipateParams): Promise<Exp.ParticipateResponse> {
    if (!session) session = await this.init({ baseUrl: this.baseUrl })

    const force = this.forceVariant(`force-${experimentName}`)

    const res = await this.experiment.participateExperiment({
      force,
      session,
      experimentName,
      variationsName,
      traffic: traffic || 1
    })

    return res
  }

  async convert ({
    kpi,
    session,
    experimentName
  }: Exp.ConvertParams): Promise<void> {
    if (!session) session = await this.init({ baseUrl: this.baseUrl })

    await this.experiment.convertEvent({
      kpi,
      session,
      experimentName
    })
  }

  forceVariant (cookieName: string): any {
    const decodedCookies = decodeURIComponent(document.cookie)
    const cookies = decodedCookies.split(';')

    const forceCookie = cookies.find((cookie) => cookie.match(cookieName))
    if (forceCookie) return forceCookie.replace(`${cookieName}=`, '').trim()

    return forceCookie || null
  }
}
