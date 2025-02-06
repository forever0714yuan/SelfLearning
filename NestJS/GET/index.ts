import axios from "axios";

const Ge1t = (url: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const fnc = descriptor.value;

    descriptor.value = function (...args: any[]) {
      axios
        .get(url)
        .then((res) => {
          fnc.apply(this, [res, { status: 200 }, ...args]);
        })
        .catch((err) => {
          fnc.apply(this, [err, { status: 500 }, ...args]);
        });
    };
  };
};

//定义控制器
class Controller {
  constructor() {}
  @Ge1t("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
  getList(res: any, status: any) {
    console.log(res, status);
  }
}
