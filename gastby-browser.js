// ServiceWorker更新準備完了時（gatby-plugins-offline内部で使われているWorkboxだとリリース時とほぼ同義）に
// ブラウザキャッシュを消すhard reloadをし、ServiceWorkerも更新する
export const onServiceWorkerUpdateReady = () => window.location.reload(true)