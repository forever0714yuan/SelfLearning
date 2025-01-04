#define NAPI_VERSION 3      // 指定addon版本
#define NAPI_CPP_EXCEPTIONS // 启用 Node.js N-API 中的 C++ 异常支持
#include <Windows.h>
#include <napi.h>

Napi::Value getScreenSize(const Napi::CallbackInfo &info)
{

    Napi::Env env = info.Env();
    Napi::Object result = Napi::Object::New(env);

    int cx = GetSystemMetrics(SM_CXSCREEN);
    int cy = GetSystemMetrics(SM_CYSCREEN);

    result.Set("width", cx);
    result.Set("height", cy);

    return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set("getScreenSize", Napi::Function::New(env, getScreenSize));
    return exports;
}
NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)