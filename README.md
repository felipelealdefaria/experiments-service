# Experiments Service

[![npm version](https://img.shields.io/npm/v/@felipelealdefaria/experiments-service)](https://github.com/felipelealdefaria/experiments-service)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@felipelealdefaria/experiments-service)](https://github.com/felipelealdefaria/experiments-service)
[![npm bundle minzipped size (minzipped)](https://img.shields.io/bundlephobia/minzip/@felipelealdefaria/experiments-service)](https://github.com/felipelealdefaria/experiments-service)
[![repo stars](https://img.shields.io/github/stars/felipelealdefaria/experiments-service)](https://github.com/felipelealdefaria/experiments-service)
[![repo license](https://img.shields.io/github/license/felipelealdefaria/experiments-service)](https://github.com/felipelealdefaria/experiments-service)

Experiments service for creating A/B tests using lib [sixpack-js](https://github.com/sixpack/sixpack-js).

### Requirements

Clone this repo [sixpack-docker](https://github.com/LucianoNMoreira/sixpack-docker-compose) and run:

```bash
docker-compose up
```
```bash
API URI: http://127.0.0.1:5000/
SIXPACK DASH: http://127.0.0.1:5001/
```

### Installation

```bash
yarn add @felipelealdefaria/experiments-service
# or
npm i @felipelealdefaria/experiments-service
```

### Usage

```typescript
import experiment from '@felipelealdefaria/experiments-service'
```

**1) Initialize:**

This is required before any other methods can be called.

```typescript
await experiment.init(params: InitParams): Promise<InitResponse>
```

```bash
InitParams:
- baseUrl: string
- timeout?: number (default: 8000)
```
```bash
InitResponse:
- session: unknown
- error?: boolean
- success?: boolean
- message?: string
```

**2) Experiment Participate:**

To start an experiment (test a/b).

```typescript
await experiment.participate(params: ParticipateParams) => Promise<ParticipateResponse>
```

```bash
ParticipateParams
- session: unknown
- traffic?: number (default: 1) // means 50% for each variable
- variationsName: string[]
- experimentName: string
```
```bash
ParticipateResponse
- alternativeName?: string | null
- experimentName?: string | null
- error?: boolean
- success?: boolean
- message?: string
```

**3) Experiment Convert:**

To convert an experiment KPI.

```typescript
await convert(params: ConvertParams) => Promise<ConvertResponse>
```

```bash
ConvertParams
- kpi?: string
- session: unknown
- experimentName: string
```
```bash
ConvertResponse
- kpi?: string
- experimentName?: string
- alternativeName?: string
- error?: boolean
- success?: boolean
- message?: string
```

**4) A/B Test with React.Js:**

```typescript
return (
  <>
    { res?.alternativeName === 'variant_option'} ? <ComponentA /> : <ComponentB /> }
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

``` // javascript
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
