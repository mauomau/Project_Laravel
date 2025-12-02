<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

Route::get('/laravel', function () {
    return view('welcome');
});

Route::get('hello-world', function () {
    return view('hello-world');
});


// Formulaire Login (POST)
Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials, $request->boolean('remember'))) {
        $request->session()->regenerate();

        return redirect()->intended(route('dashboard'));
    }

    return back()->withErrors([
        'email' => 'Les informations de connexion sont incorrectes.',
    ])->onlyInput('email');
})->middleware('throttle:5,1')->name('login');

Route::post('/register', function (Request $request) {
    $fields = $request->validate([
        'name' => 'required',
        'email' => 'required|email',
        'password' => 'required'
    ]);

    if ($request->hasFile('image')) {
        $request->file('image')->store('images');
    }

    // Gerer fields
    if ($fields) {
        // Verifier si l'email est deja utilise
        if (User::where('email', $fields['email'])->exists()) {
            return back()->withErrors(['email' => 'Email deja utilise'])->withInput();
        }

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
            'image' => $request->file('image')?->store('images')
        ]);

        Auth::login($user); // Se connecter automatiquement
    } else {
        return back()->withErrors(['email' => 'Identifiants invalides'])->withInput();
    }

    return redirect('/dashboard');
});

Route::middleware('guest')->group(function () {

    Route::get('/', function () {
        return Inertia::render('Home');
    });

    Route::get('/login', function () {
        return Inertia::render('Login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Register');
    })->name('register');
});

// Authentification et Deconnexion
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'auth' => Auth::user()
        ]);
    })->name('dashboard');

    Route::get('/profile', function () {
        return Inertia::render('Profile', [
            'auth' => Auth::user()
        ]);
    });

    // Deconnexion (POST)
    Route::post('/logout', function () {
        Auth::logout();
        return Inertia::location('/');
    })->name('logout');
});
