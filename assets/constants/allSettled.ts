export const allSettled = (promises: Promise<any>[]) => {
  return Promise.all(
    promises.map(promise =>
      promise
        .then(value => ({state: 'fulfilled', value, reason: undefined}))
        .catch(reason => ({state: 'rejected', value: undefined, reason})),
    ),
  );
};
