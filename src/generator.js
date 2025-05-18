function* infinite() {
    let index = 0;
  
    while (true) {
      yield index++;
    }
  }
  
  const generator = infinite(); 

  for (let i = 0; i < 10; i++) {
    console.log(generator.next().value); // 3, 4, 5, ...
  }
  
  