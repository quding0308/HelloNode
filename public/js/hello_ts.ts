
{

    let isDone: boolean = false;

    let dexLiteral: number = 6;
    let hexLiteral: number = 0xf00d;
    
    let firstName: string = "bob";

    // 数组
    let list: number[] = [1, 2, 3];
    let list1: Array<number> = [1, 2, 3];

    // 元组
    let x: [string, number];
    x = ["hello", 10];
    x[0].substr(1);

    // 枚举
    enum Color {
        Red = 1,
        Green,
        Blue
    }

    // Any
    let notSure: any = 4;

    // Void
    function warnUser(): void {
        console.log("");
    }

    // 类型转换
    let someValue: any = "this is a string";
    let strLength: number = (someValue as string).length;
}



