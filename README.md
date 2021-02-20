# Experiments Service
Experiments service for creating A/B tests using lib [sixpack-js](https://github.com/sixpack/sixpack-js).

### Installation

```bash
yarn add @felipelealdefaria/experiments-service
# or
npm i @felipelealdefaria/experiments-service
```

### Usage

**1) Initialize:**

```
import { experiment } from '@felipelealdefaria/experiments-service'

const session = await experiment.init({ baseUrl: string }): Promise<InitResponse>
```

**2) Experiment Participate:**

```
const res = await experiment.participate({ session, experimentName: string, variationsName: string[], traffic?: number (default: 1) }): Promise<ParticipateResponse>
console.log(res) // { experimentName: string, alternativeName: string }
```

**3) Experiment Convert:**

```
convert({ session, experimentName: string, kpi?: string }): Promise<void>
```

**4) A/B Test:**

```
return (
  <>
    { res.alternativeName === 'variant_option'} ? <ComponentA /> : <ComponentB /> }
  </>
)
```

**[OBS] To force the variation, insert in your browser cookies:**

```
key: force-${experimentName}
value: ${variation_option}
```

### Possible error for those using webpack

The dependency of the project, **sixpack-client** has incompatibility with some versions of the webpack. The common error in this case may be linked to not being able to resolve the **http** and **buffer** dependencies.

To fix it, in your **webpack.config.js** file:

``` // webpack.config.js
resolve: {
    fallback: {
      http: require.resolve('stream-http'),
      buffer: require.resolve('buffer/')
    }
}
```

### Service's Architecture

Service created using the principles of Clean Architecture with the intention of facilitating maintenance and a possible exchange of lib used to perform A/B tests.

![image](https://user-images.githubusercontent.com/64376829/107972388-860f7380-6f92-11eb-9be2-9e505965ff7b.png)
