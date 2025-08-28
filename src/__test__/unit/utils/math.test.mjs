import { sum, substract } from "../../../utils/math.mjs"

describe( 'Funciones de math sum', () => {
    it( 'debe sumar dos numeros validos correctamente', () => {
            // Given
            const a = 5;
            const b = 3;

            // When
            const result = sum( a, b );

            // Then
            expect( result ).toBe( 8 );                       // Assertion 1
            expect( typeof result ).toBe( 'number' );         // Assertion 2
        });

        it( 'debe lanzar error cuando los valores no son validos', () => {
            // Given
            const a = '5';
            const b = 'juan';
            // When

            // Then
            expect( () => sum( a, b ) ).toThrow( 'Valores invalidos' );  // Assertion 3
        });
    function sum( a, b ) {
    if (typeof a !== 'number' && typeof b !== 'number') {
        throw new Error('Valores invalidos');
    }

    return a + b;
    }

describe( 'Funciones de math substract', () => {
    it( 'Debe restar correctamente',
        () => {
            // Given
            const a = 5;
            const b = 3;

            // When
            const result = substract( a, b );

            // Then
            expect( result ).toBe( 2 );  // Assertion 1
            expect( typeof result ).toBe( 'number' );  // Assertion 2
        }
    );
    it( 'debe lanzar error cuando los valores no son validos', async () => {
        // Given
        const a = '5';
        const b = 'juan';

        // When
        const result = substract( a, b );

        // Then
        expect( result ).toThrow( 'Valores invalidos' );  // Assertion 3
    } )
} )});