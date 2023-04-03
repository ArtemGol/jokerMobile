export class BaseApiService {
  constructor(uri: string) {
    this.url = `https://api.jokerlivestream.vip/${uri}`;
  }

  protected url: string;

  protected timeStampUrl = (uri: string) =>
    `${this.url}${uri}?timestamp=${new Date().getTime()}`;

  protected get = <T extends unknown>(uri: string): Promise<T> =>
    fetch(`${this.url}${uri}`, {
      method: 'GET',
    })
      .then(res =>
        res.ok ? this.onSuccess(res) : this.handleError(undefined, res),
      )
      .catch(error => this.handleError(error, undefined));

  protected post = <T extends unknown>(
    uri: string,
    body: object,
  ): Promise<T> => {
    const formdata = new FormData();
    Object.entries(body).forEach(([key, value]) => formdata.append(key, value));
    return fetch(this.timeStampUrl(uri), {
      body: formdata,
      method: 'POST',
    })
      .then(res =>
        res.ok ? this.onSuccess(res) : this.handleError(undefined, res),
      )
      .catch(error => this.handleError(error, undefined));
  };

  private onSuccess = (res: Response) =>
    res.status > 299 || res.status < 200
      ? this.handleError(undefined, res)
      : res
          .json()
          .then(value => value)
          .catch();

  private handleError = async (requestError?: unknown, res?: Response) => {
    console.log('error', res);
  };
}
