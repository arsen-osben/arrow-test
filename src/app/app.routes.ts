import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {TestRunnerComponent} from "./components/test-runner/test-runner.component";
import {TestEditorComponent} from "./components/test-editor/test-editor.component";
import {EditTestSingleComponent} from "./components/edit-test-single/edit-test-single.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test-runner', component: TestRunnerComponent },
  { path: 'test-editor', component: TestEditorComponent },
  { path: 'edit-test-single/:id', component: EditTestSingleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'user/:username', component: UserProfileComponent },
  { path: '**', redirectTo: '' }
];
