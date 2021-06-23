@extends('layout')

@section('main')
<div class="container">
    <h2>
        Buckets
        <button class="button">
            Create
        </button>
    </h2>
    <h3>

    </h3>
    <app-buckets></app-buckets>
</div>

@push('scripts')
    <script type="text/javascript" src="js/buckets.js"></script>
    <script type="text/javascript" defer>
        riot.mount('buckets', {!! json_encode([ 'buckets' => $buckets ]) !!});
    </script>
@endpush

@endsection
