<?php

use App\Livewire\Form;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

Route::get('/login', function () {
    return Redirect::away('http://localhost:8080/oauth2/authorize?response_type=code&client_id=amason-cms&redirect_uri=http%3A%2F%2Fcms%3A8001%2Fcallback&scope=openid+profile');
})->name('filament.admin.auth.login');

Route::get('/callback', function () {
    $response = Http::asForm()
        ->withBasicAuth('amason-cms', 'PNTZJzhwuLEjC64dg32UYn8Hxf75psvA')
        ->post('http://auth:8080/oauth2/token', [
            'redirect_uri' => 'http://cms:8001/callback',
            'code' => request('code'),
            'grant_type' => 'authorization_code',
        ]);

    if (!$response->successful()) {
        return redirect()->route('filament.admin.auth.login')->withErrors(['error' => 'Erro ao obter o token de acesso']);
    }

    $accessToken = $response->json()['access_token'];
    $userData = json_decode(base64_decode(explode('.', $accessToken)[1]), true);

    $user = User::firstOrCreate(
        ['email' => $userData['email'] ?? $userData['sub']],
        ['name' => $userData['name'] ?? $userData['sub']]
    );

    Auth::login($user);

    return redirect()->route('filament.admin.pages.dashboard');
});

\Illuminate\Support\Facades\Route::get('form', Form::class);
