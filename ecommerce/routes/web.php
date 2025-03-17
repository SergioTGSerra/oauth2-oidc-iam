<?php

use App\Livewire\Form;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

Route::get('/login', function () {
    return Redirect::away('http://auth:8080/oauth2/authorize?response_type=code&client_id=amason-ecommerce&redirect_uri=http%3A%2F%2Fecommerce%3A8000%2Fcallback&scope=openid+profile');
})->name('filament.admin.auth.login');

Route::get('/callback', function () {
    $response = Http::asForm()
        ->withBasicAuth('amason-ecommerce', 'eV2P7xdKySJntzgQuGf3a6Y5HwZEjmMp')
        ->post('http://auth:8080/oauth2/token', [
            'redirect_uri' => 'http://ecommerce:8000/callback',
            'code' => request('code'),
            'grant_type' => 'authorization_code',
        ]);

    if (!$response->successful()) {
        return redirect()->route('filament.admin.auth.login')->withErrors(['error' => 'Erro ao obter o token de acesso']);
    }

    $accessToken = $response->json()['access_token'];
    $userData = json_decode(base64_decode(explode('.', $accessToken)[1]), true);

    // Busca o usuário no banco de dados ou cria um novo
    $user = User::firstOrCreate(
        ['email' => $userData['email'] ?? $userData['sub']], // Ajuste conforme os dados retornados
        ['name' => $userData['name'] ?? $userData['sub']]
    );

    Auth::login($user);

    return redirect()->route('filament.admin.pages.dashboard'); // Redireciona para o painel do Filament
});

\Illuminate\Support\Facades\Route::get('form', Form::class);
