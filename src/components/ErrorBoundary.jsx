import { Component } from 'react';
import { RefreshCw } from 'lucide-react';
import { reloadOnce } from '../lib/autoUpdate.js';

/**
 * Shows a reload card instead of a blank page if anything crashes - for
 * example when a browser translator rewrites the page under React, or a
 * page chunk fails to download after a new deploy.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('LingoMitra crashed:', error);
    // A page file from an older deploy no longer exists - a fresh load fixes it.
    if (/dynamically imported module|Importing a module script failed|Loading chunk/i.test(String(error?.message))) {
      reloadOnce();
    }
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-6">
        <div className="card max-w-md p-8 text-center">
          <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-mint-light text-teal" aria-hidden="true">
            <RefreshCw className="h-8 w-8" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-ink">Something went wrong</h1>
          <p className="mt-2 text-ink-soft">
            Please reload the page. If you use the browser’s “Translate this page”, turn it off and use the language menu at the top instead.
          </p>
          <button type="button" className="btn-primary mt-6" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      </div>
    );
  }
}
