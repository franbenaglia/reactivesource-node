function timeout(ms) {
    return new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));
  }
  
  async function* timedGenerator(generator, ms) {
    const timeoutPromise = timeout(ms);
    let nextValue = generator.next();
  
    while (!nextValue.done) {
      const result = await Promise.race([
        Promise.resolve(nextValue.value),
        timeoutPromise,
      ]);
      yield result;
      nextValue = generator.next();
    }
  }
  
  async function* myGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve('First'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Second'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Third'), 1000));
  }
  
  async function main() {
    const timedGen = timedGenerator(myGenerator(), 4000);
    for await (const value of timedGen) {
      console.log('Value:', value);
    }
  }
  
  main().catch(e => console.error(e));