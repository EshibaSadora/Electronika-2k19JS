
function Main() {
    let A = new TestA();
    let B = new TestB(A);
    B.Show();
    A.value = 99;
    B.Show();
}

class TestA {
    constructor(){
        this.value = 55;
    }

    SetValue(a){
        this.value = a;
    }
}

class TestB{
    constructor(TestA){
        this.a = TestA;
    }

    Show(){
        alert(this.a.value);
    }
}