import { Button, Card, CardContent, CardHeader, Input } from "@mui/material";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex bg-blue-600">
      {/* Left side with school icon */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="text-white">
          <svg className="w-64 h-64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z" />
          </svg>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-1/2 bg-white rounded-l-[50px] flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-none border-none">
          <CardHeader>
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/api/placeholder/48/48"
                alt="School Logo"
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-2xl font-bold text-blue-600">STAGFAST</h1>
                <p className="text-sm text-gray-600">
                  Sistem Fasilitas SMAK Santa Agnes
                </p>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Login</h2>
          </CardHeader>

          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
              >
                Log In
              </Button>

              <p className="text-center text-sm text-gray-600">
                Jika terjadi kesalahan, silahkan hubungi tim IT.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
