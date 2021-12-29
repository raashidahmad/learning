/*import { Observable, throwError, timer } from 'rxjs';
import { mergeMap, finalize } from 'rxjs/operators';
import { Settings } from '../constants/settings';

export const httpRetryStrategy = ({
  maxRetryAttempts = Settings.MAX_HTTP_RETRIES,
  scalingDuration = Settings.RETRY_SCALE_DURATION,
  excludedStatusCodes = Settings.EXCLUDED_CODES,
}: {
  maxRetryAttempts?: number,
  scalingDuration?: number,
  excludedStatusCodes?: number[]
} = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find(e => e === error.status)
      ) {
        return throwError(error);
      }
      console.log(
        `Attempt ${retryAttempt}: retrying in ${retryAttempt *
          scalingDuration}ms`
      );
      return timer(retryAttempt * scalingDuration);
    }),
    finalize(() => console.log('Retry completed'))
  );
};*/