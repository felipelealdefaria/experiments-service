import { Experiments } from '@/domain/experiments'
import { ExperimentsParams } from '@/data/experiments-params'

export class ExperimentsService implements Experiments {
  baseUrl: string
  constructor (
    private readonly experiment: ExperimentsParams
  ) {}

  async init ({ baseUrl }: Experiments.InitParams): Promise<any> {
    this.baseUrl = baseUrl
    const session = await this.experiment.startExperiment({ baseUrl })
    return session
  }

  async participate ({
    traffic,
    session,
    variationsName,
    experimentName
  }: Experiments.ParticipateParams): Promise<Experiments.ParticipateResponse> {
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
  }: Experiments.ConvertParams): Promise<void> {
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
